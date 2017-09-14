import Ember from 'ember';

export default Ember.Route.extend({
    
    imapService: Ember.inject.service(),
    emailService: Ember.inject.service(),

    model() {
        var imaps = requireNode('imap-simple');
        const simpleParser = requireNode('mailparser').simpleParser;

        // Setup imap config
        var config = {
            imap: {
                user: this.get('imapService.activeAccount.imapUser'),
                password: this.get('imapService.activeAccount.imapPassword'),
                host: this.get('imapService.activeAccount.imapHost'),
                port: this.get('imapService.activeAccount.imapPort'),
                tls: this.get('imapService.activeAccount.imapTls'),
                authTimeout: this.get('imapService.activeAccount.imapAuthTimeout')
            }
        };

        console.log('connect...');
        return imaps.connect(config).then((connection) => {
            console.log('open inbox...');
            return connection.openBox('INBOX').then(() => {
                var searchCriteria = [
                'ALL' //, 'UNSEEN'
            ];

                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                };

                console.log('search...');
                return connection.search(searchCriteria, fetchOptions).then((results) => {
                    var emails = [];

                    console.log(results[1]); 
                    
                    results.forEach((item, index, array) => {
                        
                        var mail = this.store.createRecord('email');
                        
                        item.attributes.flags.forEach((item) => {
                            mail.set('seen', item.includes('\Seen'));
                        });
                        
                        
                        item.parts.forEach((item, index) => {
                            if (item.which === 'HEADER') {
                                mail.set('header', item.body.subject[0]);
                                mail.set('from', item.body.from[0]);
                            }
                            if (item.which === 'TEXT') {
                                simpleParser(item.body).then((parsedMail) => {
                                    mail.set('text', parsedMail.textAsHtml);
                                }).catch((err) => {
                                    console.log('ERR ' + err);
                                });
                            }
                        });
                        emails.push(mail);
                    });
                    connection.end();
                    return emails;
                });
            });
        });
    },
    
    actions: {
        willTransition() {
            this.store.unloadAll('email');
        }
    }

});
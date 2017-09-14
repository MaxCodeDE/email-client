import Ember from 'ember';

export default Ember.Route.extend({
    
    imapService: Ember.inject.service(),
    
    model() {
        // TEST
        //DODO: Auslesen von Speicher
        var accounts = [];
        
        var account1 = this.get('store').createRecord('account', {
            imapUser: 'test@max-bremer.info',
            imapPassword: 'test123',
            imapHost: 'vweb02.nitrado.net',
            imapPort: 993,
            imapAuthTimeout: 3000,
            imapTls: true
        });
        accounts.push(account1);
        var account2 = this.get('store').createRecord('account', {
            imapUser: 'mail@max-bremer.info',
            imapPassword: 'orange12A',
            imapHost: 'vweb02.nitrado.net',
            imapPort: 993,
            imapAuthTimeout: 3000,
            imapTls: true
        });
        accounts.push(account2);
        
        this.get('imapService').set('accounts', accounts);
        this.get('imapService').set('activeAccount', account1);
    },
    
    actions: {
        goTo(route) {
            this.transitionTo(route);
        },
        changeAccount(account) {
            this.get('imapService').set('activeAccount', account);
        },
        shutdownApp() {
            const remote = requireNode('electron').remote;
            var window = remote.getCurrentWindow();
            window.close();
        }
    }
});
Ember.$(document).ready(function() {
    Ember.$('#content').height(Ember.$(window).height() - 64);
});
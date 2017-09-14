import DS from 'ember-data';

export default DS.Model.extend({

    imapUser: DS.attr('String'),
    imapPassword: DS.attr('String'),
    imapHost: DS.attr('String'),
    imapPort: DS.attr('Number'),
    imapAuthTimeout: DS.attr('Number'),
    imapTls: DS.attr('Boolean')
    
    
});

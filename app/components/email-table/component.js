import Ember from 'ember';

export default Ember.Component.extend({
    
    tagName: '',
    mailText: '',
    mailSubject: '',
    showMail: false,
    
    actions: {
        openMail(email) {
            this.set('mailText', email.get('text'));
            this.set('mailSubject', email.get('header'));
            this.set('showMail', true);
        },
        showMaillist() {
            this.set('showMail', false);
        }
    }
    
});

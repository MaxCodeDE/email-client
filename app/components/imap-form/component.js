import Ember from 'ember';

export default Ember.Component.extend({
    
    imapService: Ember.inject.service(),
    

    actions: {
        save() {
            this.get('imapService').setup(this.get('imapUser'), this.get('imapPassword'), this.get('imapHost'), this.get('imapPort'), this.get('imapTls'));
        }
    }
});

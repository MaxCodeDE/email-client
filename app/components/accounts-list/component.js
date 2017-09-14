import Ember from 'ember';

export default Ember.Component.extend({
    
    imapService: Ember.inject.service(),
    
    currentAccount: Ember.computed('imapService.activeAccount', function() {
        return this.get('imapService.activeAccount.imapUser') + " ";
    }),

    actions: {
        changeAccount() {
            
        }
    }
});

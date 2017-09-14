import Ember from 'ember';

export default Ember.Service.extend({

    getSubjectsFromImapResult: function(results) {
        return results.map(function(res) {
            return res.parts.filter(function(part) {
                return part.which === 'HEADER';
            })[0].body.subject[0];
        });
    }


});
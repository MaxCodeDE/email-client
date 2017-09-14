import DS from 'ember-data';

export default DS.Model.extend({

    header: DS.attr('String'), // Subject
    from: DS.attr('String'),
    text: DS.attr('String'),
    seen: DS.attr('Boolean', { defaultValue: false }),
    
    
});

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

ArticleSchema.methods.addUrl = function(){
    this.link = "https://www.nps.gov" + this.link;
    return this.link;
};

let Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
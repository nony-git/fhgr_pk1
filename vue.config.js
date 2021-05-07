const config = {
    devServer: {
        // open: true,
       disableHostCheck: true,
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
        cheval: {
            entry: 'src/main.js',
            template: 'public/index_cheval.html',
            filename: 'index_cheval.html',
        },
        bibeval: {
            entry: 'src/main.js',
            template: 'public/index_bibeval.html',
            filename: 'index_bibeval.html',
        },
        suchanfrage: {
            entry: 'src/main.js',
            template: 'public/index_suchanfrage.html',
            filename: 'index_suchanfrage.html',
        },
    },
    // ...config code
}
module.exports = config
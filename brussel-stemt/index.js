const brusselStemtContainer = document.querySelector('.js-brussel-stemt-container');

if (brusselStemtContainer) {
    const { title, intro } = brusselStemtContainer.dataset;

    import(/* webpackChunkName: "brusselStemt" */ './app').then(({ renderBrusselStemt }) => {
        renderBrusselStemt(brusselStemtContainer, title, intro);
    });
}


export const manageURL = (a, b, navigate, searchParams, location) => {
    if (searchParams.get(a) && a !== 'minPrice' && a !== 'maxPrice') {
        const _searchParams = new URLSearchParams(searchParams);
        const matchType = searchParams.get(a)
        var matchTypeArray = matchType.split('-');
        if (matchTypeArray.includes(String(b))) {
            matchTypeArray = matchTypeArray.filter(item => item !== String(b))
            if (matchTypeArray.length > 0) {
                _searchParams.set(a, matchTypeArray.join('-'))
            } else {
                _searchParams.delete(a)
            }
        } else {
            matchTypeArray.push(String(b))
            _searchParams.set(a, matchType + '-' + b)
        }
        const newURL = `${location.pathname}?${_searchParams.toString()}`;
        navigate(newURL)
        return matchTypeArray;
    } else {
        const _searchParams = new URLSearchParams(searchParams);
        if (!b && (a !== 'minPrice' || a !== 'maxPrice')) {
            _searchParams.delete(a)
        } else {
            _searchParams.set(a, b)
        }
        const newURL = `${location.pathname}?${_searchParams.toString()}`;
        navigate(newURL)
        return [String(b)];
    }
}

export const getParamsFromURL = (searchParams) => {
    var size = [];
    var review = [];
    var type = [];
    var sex = [];
    var matchType = [];
    var casual = [];
    var newProduct = false;
    var minPrice = '';
    var maxPrice = '';
    var search = '';
    var discount = false;
    if (searchParams.get('size')) {
        size = searchParams.get('size').split('-')
    }
    if (searchParams.get('review')) {
        review = searchParams.get('review').split('-')
    }
    if (searchParams.get('type')) {
        type = searchParams.get('type').split('-')
    }
    if (searchParams.get('sex')) {
        sex = searchParams.get('sex').split('-')
    }
    if (searchParams.get('matchType')) {
        matchType = searchParams.get('matchType').split('-')
    }
    if (searchParams.get('casual')) {
        casual = searchParams.get('casual').split('-')
    }
    if (searchParams.get('new')) {
        newProduct = true;
    }
    if (searchParams.get('minPrice')) {
        minPrice = searchParams.get('minPrice');
    }
    if (searchParams.get('maxPrice')) {
        maxPrice = searchParams.get('maxPrice');
    }
    if (searchParams.get('search')) {
        search = searchParams.get('search');
    }
    if (searchParams.get('discount')) {
        discount = true;
    }

    return ({
        size: size,
        review: review,
        type: type,
        sex: sex,
        matchType: matchType,
        casual: casual,
        new: newProduct,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search,
        discount: discount
    })
}
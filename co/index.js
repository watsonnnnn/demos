function co(it) {
    return new Promise(function (resolve, reject) {
        function next(data) {
            let {
                value,
                done
            } = it.next(data);
            if (done) {
                resolve(value)
            } else {
                value.then(data => {
                    next(data);
                });
            }
        }
        next();
    });
}
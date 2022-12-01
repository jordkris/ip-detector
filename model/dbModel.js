module.exports = {
    add: (con, res, opts, callback) => {
        con(opts.table).insert(opts.data).then(callback).catch((err) => {
            console.error(`Error insert data in table ${opts.table}: ${err.message}`);
            if (opts.server) {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            }
        });
    },
    get: (con, res, opts, callback) => {
        let errorCallback = (err) => {
            console.error(`Failed get data from table ${opts.table}: ${err.message}`);
            if (opts.server) {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            }
        }
        if (opts.whereColumn && opts.whereValue) {
            con(opts.table).select(opts.select).where(opts.whereColumn, opts.whereValue).then(callback).catch(errorCallback);
        } else {
            con(opts.table).select(opts.select).then(callback).catch(errorCallback);
        }
    },
    update: (con, res, opts) => {
        con(opts.table).update(opts.column, opts.value).where('id', opts.id).then((result) => {
            if (result) {
                let message = 'Success update table';
                console.log(message);
                if (opts.server) {
                    res.status(200).json({
                        status: 'success',
                        message: message
                    });
                }
            } else {
                throw new Error(`Failed update table ${opts.table}`);
            }
        }).catch((err) => {
            console.error(`Error update data in table ${opts.table}: ${err.message}`);
            if (opts.server) {
                res.status(500).json({
                    status: 'error',
                    message: err.message
                });
            }
        });
    },
}
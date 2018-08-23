/**
 * Created by 汪凤杰 on 2018/8/23.
 */
module.exports = {
    plugins: {
        autoprefixer: {
            //browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%'],
            browsers: ['Android >= 4', 'Explorer >= 10', 'iOS >= 6'], cascade: false
        }
    }
};
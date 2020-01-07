module.exports = {
    publicPath:'/',
    devServer:{
        // proxy:{
        //     '/':{
        //         target:'localhost:3000/',
        //         changeOrigin:true,
        //         ws:true
        //     }
        // }
        proxy:'http://localhost:3000/'
    }
}
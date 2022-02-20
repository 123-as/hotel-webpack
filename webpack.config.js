const {resolve}=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const miniCssExtractPlugin=require("mini-css-extract-plugin");
process.env.NODE_ENV= "development" ;
module.exports={
    entry:{
        main:"./src/js/index.js",
        page2:"./src/js/page-2.js"
    },
    output:{
        filename:"js/[name].js",
        path:resolve(__dirname,"dist"),
        assetModuleFilename:"img/[contenthash:10][ext]"
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:["postcss-preset-env"]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test:/\.(jpg|.png|.gnf|jpeg|mp4|svg)$/,
                type:'asset'
            },
            {
                test:/\.html/,
                loader:'html-loader'
            }
        ]
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks:["main"],
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new  htmlWebpackPlugin({
            template:"./src/page-2.html",
            filename:"page-2.html",
            chunks:["page2"],
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new miniCssExtractPlugin({
            filename:"css/[name].css"
        })
    ],
    mode:"development"
}
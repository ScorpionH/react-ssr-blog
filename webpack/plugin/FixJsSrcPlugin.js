const pluginName = 'FixJsSrcPlugin'
module.exports = class FixJsSrcPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
                let {js, css} = htmlPluginData.assets;
                htmlPluginData.assets.js = js.map(_js => '/' + _js);
                htmlPluginData.assets.css = css.map(_css => '/' + _css);
            });
        })
    }
}
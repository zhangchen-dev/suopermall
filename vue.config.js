module.exports = {
    configurewebpack: {
        resolve: {
            alias: {
                '@': 'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': "@/network",
            }
        }
    }
}
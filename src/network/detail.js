import { request } from "./request"
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}


// 定义详情页要展示的数据
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.newPrice
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDest
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

// 商店信息
export class shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}
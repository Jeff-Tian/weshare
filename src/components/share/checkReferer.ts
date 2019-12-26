import cheerio from 'cheerio';
import axios from "axios";

const R = require('ramda')

export default async function checkReferer() {
    if (!document.referrer) {
        return Promise.reject('没有 referrer')
    }

    return parseUrl(document.referrer)
}

export async function parseUrl(url: string) {
    const xx = (url: string) => async (selector: string) => {
        const res = await axios.get(url)
        const $ = cheerio.load(res.data)

        return $(selector)
    }

    const parse = R.memoizeWith(R.identity, xx)
    const parsed = parse(`https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent(url)}`)
    const get = async (selector: string) => {
        const [query, attr] = selector.split('@')
        let $$ = await parsed(query);

        if (!attr) {
            return $$.text()
        }

        return $$.attr(attr)
    }

    const title = await get('title')
    const description = await get('meta[name="description"]@content')
    const imgUrl = await get('link[rel="icon"]@href')

    return {
        title,
        description,
        imgUrl,
        link: url
    }
}

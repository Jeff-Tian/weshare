import assert = require('assert');
import {parseUrl} from "../src/components/share/checkReferer";

describe('checkReferer', () => {

    it('parses url', async () => {
        let url = 'https://www.unicareer.com';
        const res = await parseUrl(url)

        assert(res.title === 'UniCareer-专注职场硬技能提升')
        assert(res.description === 'UniCareer(职优你)是权威专业的职前教育门户网站,新东方战略投资,职前教育著名品牌！UniCareer(职优你)常年从事职前教育培训,求职辅导,校园招聘,求职私人定制,职前专业测评,1对1名师辅导,模拟面试,精品小班课,名企直推,实习证明,和多家世界500强名企合作,教学实力雄厚,培训效果卓越。')
        assert(res.imgUrl === 'https://cdn-global1.unicareer.com/website/static/icon.png')
        assert(res.link === url)
    })
})

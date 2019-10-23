# weshare

> Sharing tool

[![Build Status](https://travis-ci.com/Jeff-Tian/weshare.svg?branch=master)](https://travis-ci.com/Jeff-Tian/weshare)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Fweshare.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Fweshare?ref=badge_shield)

## Mirrors
- https://sharing.herokuapp.com
- https://share.js.org
- https://jeff-tian.github.io/weshare

## update travis heroku api_key
```bash
travis encrypt $(heroku authorizations:create) --add deploy.api_key --pro
```

## Generate deploy key
```bash
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

## Development

This project is initially a very old Ionic project. But now I'm going to use webpack inside it, where in the [`~/src`](./src) folder will be.

## Related accounts

### open.weixin.qq.com
jie.tian@hotmail.com

### mp.weixin.qq.com
jie.tian@live.cn

### open.weibo.com
jie.tian@myfootprints.cn


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeff-Tian%2Fweshare.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeff-Tian%2Fweshare?ref=badge_large)

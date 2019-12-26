import React from "react"
import {List} from "antd-mobile"
import {Link} from "react-router-dom"

const fullLink = {width: "100%", display: "inline-block"}
export default <List><List.Item onClick={() => {
}}
                                thumb="https://tictactoe.js.org/static/media/user.9dc154d2.svg"><Link
    to="/sign-in" style={fullLink}>登录</Link></List.Item></List>

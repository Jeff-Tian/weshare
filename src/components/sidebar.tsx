import React from "react"
import {List} from "antd-mobile"
import {Link} from "react-router-dom"

const fullLink = {width: "100%", display: "inline-block"}
export default function (props: any) {
    return <List><List.Item onClick={props.onClick}
                            thumb="https://tictactoe.js.org/static/media/user.9dc154d2.svg"><Link
        to="/sign-in" style={fullLink}>登录</Link></List.Item></List>
}

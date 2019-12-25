import React, {useState} from 'react'
import layout from "./layout"

export interface AppProps {
}

export const App = (props: AppProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const onOpenChange = () => setDrawerOpen(!drawerOpen)

    return layout(onOpenChange, drawerOpen)
}

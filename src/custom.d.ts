declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "rc-form" {
    const createForm: () => (component: any) => any;
}

export const state = () => ({
    layout: 'default',
 })
     
 export const mutations = {
   CHANGE_NAV_LAYOUT(state, layout) {
     state.layout = layout;
   }
 }
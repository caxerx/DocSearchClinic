
export const actionOpenDialog = ({ commit },type) => {
  commit("openDialog",type);
}

export const actionCloseDialog = ({ commit },type) => {
  commit("closeDialog",type);
}


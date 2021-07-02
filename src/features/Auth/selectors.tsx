//@ts-nocheck
export const selectServers = state => state?.auth?.servers;
export const selectServerRealm = state => state?.auth?.serverRealm;
export const currentHostSelector = state => state?.auth?.host;

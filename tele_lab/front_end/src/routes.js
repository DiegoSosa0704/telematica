export default {
  login: "/login",
  signup: "/signup",
  verify_email: "/verify-email/:token",
  home: "/",
  education_user: {
    record: "/record",
    recommended: "/recommended",
    loans: "/loans",
    user: "/user"
  },
  admin_user: {
    loans: "/loans",
    returns: "/returns",
    loanComponent: {
      user: "/loans/user",
      component: "/loans/component",
      calendar: "/loans/calendar"
    },
    inventory: "/inventory",
    maintenance: "/maintenance",
    users: "/users"
  }
}
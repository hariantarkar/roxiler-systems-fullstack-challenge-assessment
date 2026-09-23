exports.validateName = (name) => {
  return typeof name === "string" && name.length >= 20 && name.length <= 60;
};

exports.validateAddress = (address) => {
  return typeof address === "string" && address.length > 0 && address.length <= 400;
};

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validatePassword = (password) => {
  // 8-16 characters, at least one uppercase letter and one special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
  return passwordRegex.test(password);
};

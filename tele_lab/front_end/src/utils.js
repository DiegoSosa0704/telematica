export const changeState = (state) => {
  if (state === "IN") {
    return "En servicio"
  } else if (state === "OU") {
    return "Fuera de servicio"
  } else if (state === "FR") {
    return "Frágil"
  } else {
    return "NA"
  }
};

export const changeStatus = (status) => {
  if (status === "AV") {
    return "Disponible"
  } else if (status === "OL") {
    return "En prestamo"
  } else if (status === "IM") {
    return "En mantenimiento"
  } else if (status === "NA") {
    return "No disponible"
  } else {
    return "NA"
  }
};

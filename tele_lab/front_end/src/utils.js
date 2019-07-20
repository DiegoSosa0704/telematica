import _ from 'lodash'

export const changeStateComponent = (state) => {
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

export const changeStatusComponent = (status) => {
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

export const changeTypeAcademic = (type) => {
  if (type === "ES") {
    return "Estudiante"
  } else if (type === "TE") {
    return "Docente"
  } else {
    return "NA"
  }
};

export const changeStateLoanComponent = (state) => {
  if (state === 0) {
    return "Péndiente"
  } else if (state === 1) {
    return "Entregado"
  } else {
    return "NA"
  }
};

export const dateToString = (date) => {
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
};

export const dateTimeToString = (dateTime) => {
  let options = {hour: "numeric", hour12:"false"};
  return new Date(dateTime).toLocaleTimeString('es-CO', {timeZone: 'UTC'});
};

export const formatDate = (today) => {
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
};

export const formatDateTime = (today) => {
  console.log(today)
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + ' ' + time;
};

function getPaginatedItems(items, page, pageSize) {
  let pg = page || 1,
    pgSize = pageSize || 100,
    offset = (pg - 1) * pgSize,
    pagedItems = _.drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems
  };
}

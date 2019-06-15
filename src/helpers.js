export const summaryDonations = (danations) => (
  danations.reduce((accumulator, value) => (accumulator + value))
);


export function groupByProp(originalArray, prop) {
  var newArrByProp = originalArray.reduce(function(r,a){
    const key = a[prop];
    r[key] = r[key] || [];
    r[key].push(a);
    return r;
  },Object.create(null));
  return newArrByProp;
}


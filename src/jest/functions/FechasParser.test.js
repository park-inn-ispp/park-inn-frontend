import parsearFechas from "../../Util/FechasParser";

expect.extend({
  toBeValidCustom(from, to, ceiling) {
    const pass = from == to;
    if (pass) {
      return {
        message: () =>
          `expected '${from}' to be '${to}' - Test passed!`,
        pass: true,
      };
    } else {
      return {
        message: () =>
        `expected '${from}' to be '${to}' - Test not passed!`,
        pass: false,
      };
    }
  },
});

test('Test funcion "fechasParser" ', () => {
    var arrayFechas = ['10-7-22T10:22:36','10!8/22T10:22:322:2226']

    expect(parsearFechas(arrayFechas[0])).toBeValidCustom("10-7-22 10:22");
    expect(parsearFechas(arrayFechas[1])).toBeValidCustom("10!8/22 10:22");
    
  });
  
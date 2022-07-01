const splitNumbers = (m: number, x: number, y: number) => {
    const xH: number = Math.floor(x / Math.pow(10, m));
    const xL: number = x % Math.pow(10, m);

    const yH: number = Math.floor(y / Math.pow(10, m));
    const yL: number = y % Math.pow(10, m);

    return {
        xH,
        xL,
        yH,
        yL
    }
}

const product = (x: number, y: number, m: number) => {

        if (x < 10 && y < 10) return x * y;   

        const { xH, xL, yH, yL } = splitNumbers(m, x, y);

        product(x, y, m);
}

const getProduct = (x: number, y: number) => {
    if (x < 10 && y < 10) {
      console.log(`${x} * ${y} = ${x * y}`)

      return x * y;
    }

    const n: number = Math.max(x.toString().length, y.toString().length);
    const m: number = Math.ceil(n / 2);

    /* const xH: number = Math.floor(x / Math.pow(10, m));
    const xL: number = x % Math.pow(10, m);

    const yH: number = Math.floor(y / Math.pow(10, m));
    const yL: number = y % Math.pow(10, m); */

    const { xH, xL, yH, yL } = splitNumbers(m, x, y);

    const test: number = product(x, y, m)

    const a: number = getProduct(xH, yH);
    const d: number = getProduct(xL, yL)
    const e: number = getProduct(xH + xL, yH + yL) - a - d;

    return a * Math.pow(10, m * 2) + e * Math.pow(10, m) + d;
  };

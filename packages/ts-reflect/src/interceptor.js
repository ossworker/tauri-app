import "reflect-metadata";
export function Intercept(e) {
  return function (t, r, a) {
    let o = a.value;
    if ("function" != typeof o)
      throw Error("@Intercept can only be used on methods.");
    let n = Array.isArray(e) ? e : [e];
    a.value = async function (...e) {
      for (let t of n) t.before && (await t.before(...e));
      let t = await o.apply(this, e);
      for (let e of n.reverse()) e.after && (await e.after(t));
      return t;
    };
  };
}

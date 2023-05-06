import * as screen from '../screens';

const screenlist = Object.keys(screen).reduce((acc: Array<any>, key: string) => {
  acc.push({
    id: key,
    name: key,
    component: screen[key as keyof typeof screen]
  });
  return acc;
}, []);

export default screenlist;

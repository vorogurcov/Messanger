declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const content: { [className: string]: string };
    export default content;
  }

declare module '*.png' {
    const value: string;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export = value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export = value;
  }
  
  declare module '*.gif' {
    const value: string;
    export = value;
  }
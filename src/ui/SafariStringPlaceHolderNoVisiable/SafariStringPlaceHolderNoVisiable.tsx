// in my testing, with iphone ios 15, if the loading text is empty, the spinner will not show up even if has many div and also file size is over 1kb , but if there is some text, even if it's hidden with sr-only, the spinner will show up. So I added a hidden text to make sure the spinner shows up in safari.

// it is true for fetching in layout.tsx
function SafariStringPlaceHolderNoVisiable() {
  return (
    <span className="sr-only" aria-hidden="true">
      loading Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
      assumenda consectetur nisi rem laborum sunt voluptatibus fugit natus iste
      nostrum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Consectetur est nesciunt quae ut, consequuntur iure numquam cumque, saepe
      ea qui vero harum
    </span>
  );
}

export default SafariStringPlaceHolderNoVisiable;

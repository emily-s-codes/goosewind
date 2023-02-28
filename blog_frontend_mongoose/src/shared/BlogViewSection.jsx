const BlogViewSection = (props) => {
    return ( 
        <section 
        className="
        grid 
        grid-rows-max 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        my-10 
        mx-20">
            {props.children}
        </section>
     );
}
 
export default BlogViewSection;
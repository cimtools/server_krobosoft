// #include "Servico1.hpp"

template<
    class Body, class Allocator,
    class Send>
void
rout(
    boost::beast::string_view doc_root,
    boost::beast::http::request<Body, boost::beast::http::basic_fields<Allocator>>&& req,
    Send&& sendCallback)
{
    std::cout << "Routing received request \n";

    boost::beast::http::response<boost::beast::http::string_body> res{boost::beast::http::status::ok, req.version()};
    res.keep_alive(req.keep_alive());
    res.set(boost::beast::http::field::server, BOOST_BEAST_VERSION_STRING);

    // if ( Service1::matchRoute("path_extracted_from_res_variable") ) { Service1::staticFunc("in_variable", res); }

    res.prepare_payload();
    return sendCallback(std::move(res));
}

// ex.:
// static void Service1::staticFunc (const string& storeId, boost::beast::http::response<boost::beast::http::string_body>& out_response)
// {
//     Database::GetInfo(in_variable, out_variable);

//     std::string outputstring = std::move(out_variable.Serialize());

//     std::cout << "Responding: " << outputstring << std::endl;

//     out_response.set(boost::beast::http::field::content_type, "application/json");
//     out_response.body() = outputstring;
    
//     return true;
// }
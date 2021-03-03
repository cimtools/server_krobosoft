#include "Server.hpp"

int main(int argc, char* argv[])
{
    auto const address = net::ip::make_address("0.0.0.0");
    auto const port = static_cast<unsigned short>(std::atoi("8080"));
    auto const doc_root = std::make_shared<std::string>("/Resources/");
    auto const threads = std::max<int>(1, std::atoi("1"));

    std::cout << "Starting kroboserver... v0.1" << std::endl;

    // The io_context is required for all I/O
    net::io_context ioc{threads};

    // The SSL context is required, and holds certificates
    ssl::context ctx{ssl::context::tlsv12};

    // This holds the self-signed certificate used by the server
    load_server_certificate(ctx);

    // Create and launch a listening port
    std::make_shared<listener>(
        ioc,
        ctx,
        tcp::endpoint{address, port},
        doc_root)->run();

    // Run the I/O service on the requested number of threads
    // Emplacion back a lambda in this vector will cause a lambda to be passed as argument to a thread constructor
    // efectevely running the lambda as a thread on spot.
    std::vector<std::thread> v;
    v.reserve(threads - 1);
    for(auto i = threads - 1; i > 0; --i)
        v.emplace_back(
        [&ioc]
        {
            ioc.run();
        });
    ioc.run();

    return EXIT_SUCCESS;
}
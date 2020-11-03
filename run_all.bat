cmd /C "mvn clean install"
start "aggregator" cmd /C "cd aggregator/target & java -jar aggregator-1.0.jar"
start "html_client" cmd /C "cd client_html/target & java -jar client_html-1.0.jar"
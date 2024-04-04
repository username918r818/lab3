mvn clean package
echo >target/dockerfile "FROM quay.io/wildfly/wildfly:27.0.0.Final-jdk11"
echo >>target/dockerfile "COPY *.war /opt/jboss/wildfly/standalone/deployments"
docker build --tag=zakusov_web3 target/
docker run -it -p 8080:8080 zakusov_web3
docker image rm zakusov_web3 -f
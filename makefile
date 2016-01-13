INSTALL_DIR=/var/www/html
install:
	[ -d /var/www/html ] || sudo mkdir /var/www/html
	tar cf - . | (cd ${INSTALL_DIR} && sudo tar xf -)

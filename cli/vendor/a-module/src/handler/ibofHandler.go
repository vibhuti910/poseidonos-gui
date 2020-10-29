package handler

import (
	"a-module/src/log"
	"a-module/src/setting"
	"a-module/src/util"
	"bytes"
	"errors"
	"io"
	"net"
)

func ConnectToIBoFOS() (net.Conn, error) {
	var err error = nil
	uri := setting.Config.Server.IBoF.IP + ":" + setting.Config.Server.IBoF.Port

	conn, err := Dial("tcp", uri)

	if err != nil {
		log.Info("ConnectToIBoFOS : ", err)
		setting.Config.DAgentSocketAddr = "Disconnect"
		setting.Config.IBoFOSSocketAddr = "Disconnect"
	} else {
		setting.Config.DAgentSocketAddr = conn.LocalAddr().String()
		setting.Config.IBoFOSSocketAddr = conn.RemoteAddr().String()
	}
	util.PrintCurrentServerStatus()

	return conn, err
}

func DisconnectToIBoFOS(conn net.Conn) error {
	var err error = nil

	if conn != nil {
		log.Info("Connection Cloase : ", conn.LocalAddr().String())
		err = conn.Close()
	}

	return err
}

func ReadFromIBoFSocket(conn net.Conn) ([]byte, error) {
	var err error
	var buf []byte

	log.Info("readFromIBoFSocket Start")

	if conn == nil {
		log.Info("readFromIBoFSocket : Conn is nil")
	} else {
		buf = make([]byte, 1024*1024)
		_, err = conn.Read(buf)
		if err != nil || err == io.EOF {
			log.Info("readFromIBoFSocket : Message Receive Fail :", err)
			//conn.Close()
			//conn = nil
		} else {
			log.Info("readFromIBoFSocket : Message Receive Success")
			buf = bytes.Trim(buf, "\x00")
		}
	}
	return buf, err
}

func WriteToIBoFSocket(conn net.Conn, marshaled []byte) error {
	var err error = nil
	if conn == nil {
		err = errors.New("WriteToIBoFSocket : Conn is nil")
		log.Error(err)
	} else {
		_, err = conn.Write(marshaled)
		if err != nil {
			//conn.Close()
			//conn = nil
			log.Infof("WriteToIBoFSocket : Writre Fail - %s\n", err)
			log.Infof("WriteToIBoFSocket : Conn closed\n")
		} else {
			log.Infof("WriteToIBoFSocket : Write Success\n")
		}
	}
	return err
}

package login

import (
	"fmt"
	"os/exec"
)

func EnrollAdmin() error {

	certfilesPath := "/root/project/network/organizations/fabric-ca/org1/tls-cert.pem"
	cmd := exec.Command(
		"fabric-ca-client", "enroll",
		"-u", "https://admin:adminpw@localhost:7054",
		"--caname", "ca-org1",
		"--tls.certfiles", certfilesPath,
	)

	if err := cmd.Run(); err != nil {
		fmt.Println("enroll admin error", err)
		return err
	}

	return nil
}

func RegisteringUser(name string) error {

	caName := "ca-org1"
	secret := name + "pw"
	certfilesPath := "/root/project/network/organizations/fabric-ca/org1/tls-cert.pem"
	cmd := exec.Command(
		"fabric-ca-client", "register",
		"--caname", caName,
		"--id.name", name,
		"--id.secret", secret,
		"--id.type", "client",
		"--tls.certfiles", certfilesPath,
	)

	if err := cmd.Run(); err != nil {
		fmt.Println("register error", err)
		return err
	}

	return nil
}

func MakeUserMSP(name string) error {

	url := "https://" + name + ":" + name + "pw@localhost:7054"
	caName := "ca-org1"
	mspPath := "/root/project/network/organizations/peerOrganizations/org1.example.com/users/" + name + "@org1.example.com/msp"
	certfilesPath := "/root/project/network/organizations/fabric-ca/org1/tls-cert.pem"

	cmd := exec.Command("fabric-ca-client", "enroll",
		"-u", url,
		"--caname", caName,
		"-M", mspPath,
		"--tls.certfiles", certfilesPath,
	)

	if err := cmd.Run(); err != nil {
		fmt.Println("make user msp error", err)
		return err
	}

	// copy config.yaml
	orgConfig := "/root/project/network/organizations/peerOrganizations/org1.example.com/msp/config.yaml"
	userConfig := "/root/project/network/organizations/peerOrganizations/org1.example.com/users/" + name + "@org1.example.com/msp/config.yaml"
	cmd = exec.Command("cp", orgConfig, userConfig)

	if err := cmd.Run(); err != nil {
		fmt.Println("copy config.yaml error", err)
		return err
	}

	return nil

}

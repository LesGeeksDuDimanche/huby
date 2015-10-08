all: RFSniffer
	
RFSniffer: RCSwitch.o RFSniffer.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lcurl
	
clean:
	$(RM) *.o RFSniffer
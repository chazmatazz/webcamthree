MXMLC = mxmlc
FLAGS = -static-link-runtime-shared-libraries
MAIN = as3_src/com/charlesdietrich/WebcamThree.as
SRC_PATH = as3_src
OUTPUT = swf/webcamthree.swf

all:
	$(MXMLC) $(FLAGS) $(MAIN) -source-path $(SRC_PATH) -output $(OUTPUT)

clean:
	rm -f $(OUTPUT)

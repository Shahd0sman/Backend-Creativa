# # Task1: Pinterest Request Journey

This diagram explains what happens when a user enters `pinterest.com` in the browser and presses Enter.

## Request Journey

The journey starts with the user and ends when the Pinterest interface is displayed.

1. **User**
   
   The user enters `pinterest.com` in the browser and presses Enter.

2. **Browser**
   
   The browser receives the website address and needs to find the IP address of the website.

3. **DNS**
   
   The browser sends a request to the DNS to find the IP address associated with `pinterest.com`.

4. **Browser**
   
   The DNS returns the IP address to the browser.

5. **HTTP Request**
   
   The browser sends an HTTP request to Pinterest's server using the IP address.

6. **Internet**
   
   The request travels through the internet until it reaches Pinterest's server.

7. **Pinterest API / Backend**
   
   Pinterest receives the request and processes it.

8. **HTTP Response**
   
   After processing the request, Pinterest sends an HTTP response back through the internet.

9. **Browser**
   
   The browser receives the response from Pinterest.

10. **UI**
    
    The browser uses the response to display the Pinterest user interface to the user.

## Simple Flow

![Pinterest Request Flow](/task1/Flow.png)

# # Task2 EventEmitter and Non-Blocking Async

This task demonstrates how to read two text files asynchronously, wait until both files are finished, merge their contents using EventEmitter, and save the result in a new file.

## Request Journey

1. Read the First File
The program reads data1.txt using fs.readFile() without blocking the program.

2. Read the Second File
The program also reads data2.txt asynchronously.

3. Wait for Both Files
The program checks if both files have finished reading.

4. EventEmitter
When both files are ready, an event called fileready is emitted.

5. Merge the Files
The EventEmitter receives the contents of both files and merges them together.

6. Create the Third File
The merged content is written into a new file called data3.txt using fs.writeFile().

## Simple Flow
data1.txt ──┐
            ├──> Both files are ready
data2.txt ──┘
                  ↓
          EventEmitter
                  ↓
             Merge Files
                  ↓
             data3.txt

## Result
 this is from data3 and these are the merged files :this is from data1 and this is from data2

## Auther
 Shahd Osman
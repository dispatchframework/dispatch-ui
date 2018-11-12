#!/bin/python
from flask import Flask, request
import os

app = Flask(__name__)

def add_header(args):
	args.append('"Cookie: cookie"')
	args.append('"X-Dispatch-Org: default"')
	args.append('"accept: application/json"')
	args.append('"content-type: application/json"')

@app.route('/v1/image')
def get_image():
	args = ["curl -X GET http://localhost:8080/v1/image"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/baseimage')
def get_baseimage():
	args = ["curl -X GET http://localhost:8080/v1/baseimage"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/function')
def get_function():
	args = ["curl -X GET http://localhost:8080/v1/function"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/api')
def get_api():
	args = ["curl -X GET http://localhost:8080/v1/api"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/event/drivers')
def get_event_driver():
	args = ["curl -X GET http://localhost:8080/v1/event/drivers"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/event/drivertypes')
def get_event_driver_type():
	args = ["curl -X GET http://localhost:8080//v1/event/drivertypes"]
	add_header(args)
	cmd = " -H ".join(args)
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/v1/runs', methods=['POST'])
def run():
	function_name = request.args.get('functionName')
	args = ["curl -X POST http://localhost:8080/v1/runs?functionName=" + function_name]
	add_header(args)
	args.append('"Accept-Encoding: gzip"')
	cmd = " -H ".join(args)
	cmd += " -d '%s'" % request.data
	resp = os.popen(cmd).read()
	return resp, 200, {'Access-Control-Allow-Origin': '*'}


if __name__ == '__main__':
    app.run()
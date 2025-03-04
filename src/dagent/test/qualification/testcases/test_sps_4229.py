import pytest, sys, json, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))
import logger as logging
logger = logging.get_logger(__name__)

with open("../config/testcase_mapping.json") as f:
    testcase_config = json.load(f)

def test_sps_4229(setup):
    event_name = testcase_config['Functional']['SPS_4229']['event_name']

    assert setup.update_event_wrr(event_name= event_name) == False
    logger.info("update event {} failed as expected with special characters".format(event_name))
